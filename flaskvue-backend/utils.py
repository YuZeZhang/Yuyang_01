# 姓名：段佳伟
import json
import os

def save_to_json(todo_items):
    with open('db.json','w') as f1:
        f1.write(json.dumps(todo_items,ensure_ascii=False,indent=2))


def load_from_json():
    if os.path.exists('db.json'):
        with open('db.json','r') as f2:
            json_date=f2.read()
            return json.loads(json_date)

    else:
        return [{'name':'PatternSearch','description':'模式搜索算法'},{'name':'CoDE','description':'CoDE算法'}]
