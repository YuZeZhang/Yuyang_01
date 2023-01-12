# 姓名：段佳伟
from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField
from wtforms.validators import DataRequired

class AlgorithmForm(FlaskForm):
    algorithm_name=StringField(label='算法名称',validators=[DataRequired(message='算法名称不能为空')])
    algorithm_description=StringField(label='算法描述',validators=[DataRequired(message='算法描述不能为空')])
    algorithm_submit=SubmitField(label='算法新建')

