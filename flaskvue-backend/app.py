# 姓名：段佳伟
import json
from forms import AlgorithmForm
from flask import Flask,request,render_template,session,redirect
from utils import load_from_json,save_to_json
from flask_cors import CORS
from flask import Blueprint, jsonify
import Usermsg
import functools
import pf

app=Flask(__name__)
app.secret_key='ecust.djw'
# CORS.init_app(app)
# from module.users import Users
user = Blueprint('user', __name__)



# from module.users import Users
# user = Blueprint('user', __name__)
# 登录接口
@app.route('/')
def login1():
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    result = {'status': 1}
    # if request.method == 'GET':
    #     return render_template('login.html')
    if request.method == 'POST':
        user = request.form.get('user')
        # 接收来自网页的账号
        pwd = request.form.get('pwd')  # 接收来自网页的密码
        user1 = Usermsg.Usermsg(user, pwd)
        logins = user1.login()
        if logins == 1:            # 将用户名存储至用户会话中，私有存储，默认情况下，会保存在cookie中。
            session['user'] = user
            return jsonify(result)
        else:
            result = {'status': 0}
            return jsonify(result)

# 注册接口
@app.route('/register', methods=['GET', 'POST'])
def register():
    # 判断是get请求还是post请求
    # if request.method == 'GET':
    #     return render_template('register.html')
    if request.method == 'POST':
        user = request.form.get('user')   #接收用户名
        pwd = request.form.get('pwd')     #接收密码
        # email = request.form.get('email')
        user1 = Usermsg.Usermsg(user, pwd ,role = 'common')   #, email)
        user1.register()

        return redirect('/login')

# @app.route('/index', methods=['GET', 'POST'])
# def index():
#     return 'welcome '


# from smtplib import SMTP_SSL
# from email.mime.text import MIMEText
# from email.header import Header
# import random
# def send_email(self, receiver, ecode):
#     """发送邮件"""
#     sender = 'XXX <xxxxxxxxx@qq.com>'  # 邮箱账号和发件者签名
#     # 定义发送邮件的内容，支持HTML和CSS样式
#     content = f"您的邮箱验证码为：<span style='color: red; font-size: 20px;'>{ecode}</span>"
#     message = MIMEText(content, 'html', 'utf-8')  # 实例化邮件对象，并指定邮件的关键信息
#     # 指定邮件的标题，同样使用utf-8编码
#     message['Subject'] = Header('验证码', 'utf-8')
#     message['From'] = sender
#     message['To'] = receiver
#     smtpObj = SMTP_SSL('smtp.qq.com')  # QQ邮件服务器的链接
#     smtpObj.login(user='xxxxxxxxx@qq.com', password='授权码')  # 通过自己的邮箱账号和获取到的授权码登录QQ邮箱
#     # 指定发件人、收件人和邮件内容
#     smtpObj.sendmail(sender, receiver, str(message))
#     smtpObj.quit()
# def gen_email_code(self):
#     str = random.sample(string.ascii_letters + string.digits, 6)
#     return ''.join(str)
# @user.route('/ecode', methods=['POST'])
# def ecode():
#     email = request.form.get('email')
#     # 对邮箱进行格式校验
#     if not re.match('^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$', email):
#         return 'email-invalid'
#     code = gen_email_code()
#     try:
#         send_email(email, code)
#         session['ecode'] = code  # 将邮箱验证码保存在session中
#         return 'send-pass'
#     except:
#         return 'send-fail'







'''算法管理部分'''
algorithm_list=load_from_json()
@app.route('/algorithm',methods=['GET','POST'])
#@auth
def algorithm_page():
    _todo_item=[]
    for item in algorithm_list:
        if item.get('delete')!=1:
            _todo_item.append(item)
    save_to_json(_todo_item)
    return json.dumps(_todo_item,ensure_ascii=False)

def auth(func):
    @functools.wraps(func)
    def inner(*args,**kwargs):
        if not session.get('username'):
            return redirect('/loginPage')
        return func(*args,**kwargs)
    return inner



@app.route('/algorithm/edit',methods=['GET','POST'])
#@auth
def edit_algorithm():
    algorithm_edit_name = request.args.get('name')
    if request.method=='GET':
        return render_template('algorithm_edit.html',algorithm_edit_name=algorithm_edit_name)
    elif request.method=='POST':
        ##修改参数(未定)
        return {'success':0}


@app.route('/algorithm/delete',methods=['GET','POST'])
#@auth
def delete_algorithm():
    algorithm_delete_name = request.args.get('name')  # 前端定义

    for item in algorithm_list:
        if item['name'] == algorithm_delete_name:
            item['delete']=1
    save_to_json(algorithm_list)
    print(algorithm_list)

    return {'success':0}


@app.route('/algorithm/add',methods=['GET','POST'])
#@auth
def add_algorithm():
    if request.method=='POST':
        lst=[]
        algorithm_name=request.form.get('name')
        algorithm_description=request.form.get('description')
        lst.extend([{'name':algorithm_name,'description':algorithm_description}])
        algorithm_list.extend(lst)
        save_to_json(algorithm_list)
        return {'success':0}




'''求解pf,opf问题'''
@app.route('/algorithm/pf-opf',methods=['POST'])
def pf_opf():
#（①solver ②verbose ③mip_solver ④lodf_tolerance）参数的确定
    print(v_df)
    print(v_df)





if __name__ == '__main__':
    app.run(debug=True)
