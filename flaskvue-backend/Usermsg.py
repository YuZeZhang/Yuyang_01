import pymysql.cursors

user_message = [{
    'username': '',
    'password': '',
    # 'role': ''
}]
# 定义用户类class User:
class Usermsg:


    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        # self.role = role

    # 登录账号
    def login(self):
        db = pymysql.connect(
            host="localhost",
            port=3306,
            user='root',
            password='xiaoweihao',
            charset='utf8mb4'
        )  # 连接数据库
        cursor = db.cursor()
        # 每次连接之前，检查当前连接是否已关闭，如果连接关闭则会重新进行连接。
        db.ping(reconnect=True)
        # sql语句，用来查询前端输入的用户名与数据库中user表对应的密码
        sql = 'use electric_test'
        cursor.execute(sql)
        sql = "select pwd from usermessage where user='" + self.user + "'"
        # 执行sql语句
        cursor.execute(sql)
        # 将数据从数据库读出 类型为元组类型
        results = cursor.fetchone()
        # 判断前端输入的密码是否与数据库密码一致，一致则返回1
        try:
            if self.pwd in results:
                return 1
        except:
            return 0
        # 关闭数据库
        db.close()

    # 注册账号
    def register(self):
        db = pymysql.connect(
            host="localhost",
            port=3306,
            user='root',
            password='xiaoweihao',
            charset='utf8mb4'
        )  # 连接数据库
        cursor = db.cursor()
        db.ping(reconnect=True)
        sql = 'use electric_test'
        cursor.execute(sql)
        # 向sql数据库中添加注册信息的语句
        sql_0 = "INSERT INTO usermessage(user,pwd) VALUES(%s,%s,'common')"
        sql = sql_0 % (repr(self.user), repr(self.pwd))
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
        # 关闭数据库
        db.close()
        user_message.append({
            'username': self.user,
            'password': self.pwd,
            'role': 'common'
        })