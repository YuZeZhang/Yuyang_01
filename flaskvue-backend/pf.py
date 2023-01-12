# -*- coding: utf-8 -*-
"""
@Project:power_flow_optimization 
@File    :pf.py
@IDE     :PyCharm 
@Author  :wangming
@Date    :2022/12/19 16:00
@Env     :GridCal
"""

from GridCal.Engine import *
from GridCal.Engine.IO.file_handler import FileOpen

grid = FileOpen('IEEE_14.xlsx').open()  # 存储了电路模型参数的文件

# pf求解器设置
"""
目前可用的求解器(solver_type的设置)：
NR = 'Newton Raphson'
NRI = 'Newton-Raphson in current'
IWAMOTO = 'Iwamoto-Newton-Raphson'
LM = 'Levenberg-Marquardt'
FASTDECOUPLED = 'Fast decoupled'
HELM = 'Holomorphic Embedding'
GAUSS = 'Gauss-Seidel'
DC = 'Linear DC'
LACPF = 'Linear AC'
"""
pf_options = PowerFlowOptions(solver_type=SolverType.LACPF,  # 选择求解器
                              verbose=True,  # Verbose option where available
                              tolerance=1e-6,  # 精度
                              max_iter=25,  # 最大迭代次数
                              control_q=True  # if to control the reactive power
                              )

# opf求解器设置
"""
可用的求解器：
DC_OPF
Simple_OPF
"""
opf_options = OptimalPowerFlowOptions(solver=SolverType.Simple_OPF,
                                      verbose=False,
                                      # mip_solver=MIPSolvers.Xpress,
                                      tolerance=1.0,
                                      lodf_tolerance=0.001)
opf = OptimalPowerFlow(grid=grid, options=opf_options, pf_options=pf_options)  # 这里pf_options参数一定要有，但是对求解opf问题没有任何作用
pf = PowerFlowDriver(grid, pf_options)


# 求解pf问题并输出电压
pf.run()
headers = ['Vm (p.u.)', 'Va (Deg)', 'Vre', 'Vim']
Vm = np.abs(pf.results.voltage)
Va = np.angle(pf.results.voltage, deg=True)
Vre = pf.results.voltage.real
Vim = pf.results.voltage.imag
data = np.c_[Vm, Va, Vre, Vim]
# Create Data Frame
v_df = pd.DataFrame(data=data, columns=headers, index=grid.bus_names)
# print(v_df)


# 求解opf问题并输出电压
opf.run()
headers = ['Vm (p.u.)', 'Va (Deg)', 'Vre', 'Vim']
Vm = np.abs(opf.results.voltage)
Va = np.angle(opf.results.voltage, deg=True)
Vre = opf.results.voltage.real
Vim = opf.results.voltage.imag
data = np.c_[Vm, Va, Vre, Vim]
# Create Data Frame
v_df = pd.DataFrame(data=data, columns=headers, index=grid.bus_names)
# print(v_df)
