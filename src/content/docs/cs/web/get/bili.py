import hashlib
import re
import urllib
from urllib.parse import unquote

user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"

header = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://link.bilibili.com',
  'referer': 'https://link.bilibili.com/p/center/index',
  'sec-ch-ua': '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': user_agent
}

start_data ={
  'room_id': '',  # 填自己的room_id
  'platform': 'pc_link',
  'area_v2': '624',
  'backup_stream': '0',
  'csrf_token': '',  # 填csrf
  'csrf': '',  # 填csrf，这两个值一样的
  'build': '1234',
  'version': '1.0.0',
  # 'ts': '',
  # 'type': '2',
}

stop_data = {
    'room_id': '',  # 一样，改room_id
    'platform': 'pc_link',
    'csrf_token': '',  # 一样，改csrf，两个都改
    'csrf': '',
}

title_data = \
    {
        'room_id': '',  # 填自己的room_id
        'platform': 'pc_link',
        'title': '',
        'csrf_token': '',  # 填csrf
        'csrf': '',  # 填csrf，这两个值一样的
    }

id_data = \
    {
        'room_id': '',  # 填自己的room_id
        'area_id': 642,
        'activity_id': 0,
        'platform': 'pc_link',
        'csrf_token': '',  # 填csrf
        'csrf': '',  # 填csrf，这两个值一样的
    }

bullet_data = \
    {
        "msg": "",
        "color": 16777215,
        "fontsize": 25,
        "rnd": 0,
        "roomid": 0,
        "csrf_token": '',
        "csrf": '',
    }

version_data = {
        "system_version": 2,
        "ts": "",
    }

def ck_str_to_dict(ck_str: str) -> dict:
    """
    将字符串ck转为dict的ck

    :param ck_str: 字符串ck
    :return dict
    """
    cookies_pattern = re.compile(r'(\w+)=([^;]+)(?:;|$)')
    cookies = {key: unquote(value) for key, value in cookies_pattern.findall(ck_str)}
    return cookies

def appsign(data, appkey, appsec):
    """
    为请求 v_data 进行app签名
    :param data: 原参数
    :param appkey: key
    :param appsec: key对应的secret
    :return:
    """
    data.update({'appkey': appkey})
    data = dict(sorted(data.items()))  # 按照 key 重排参数
    query = urllib.parse.urlencode(data)  # 序列化参数
    sign = hashlib.md5((query + appsec).encode()).hexdigest()  # 计算 api 签名
    data.update({'sign': sign})
    return data

def _start_live_thread(cookie_str, area_id, header, version_data):
  try:
      # 准备请求参数
      success: bool
      resp: dict
      cookies = ck_str_to_dict(cookie_str)
      app_key = "aae92bc66f3edfab"
      app_sec = "af125a0d5279fd576c1b4418a3e8276d"

      success, resp = self.request_api(api="https://api.bilibili.com/x/report/click/now",
                            headers=header, method=self.ApiMethods.GET, success_msg="时间戳获取成功！")
      if not success or resp['code'] != 0:
          raise Exception(resp)

      v_data = version_data
      v_data['ts'] = resp["data"]["now"]
      v_data = appsign(v_data, app_key, app_sec)
      query = urllib.parse.urlencode(v_data)

      version_json: dict
      success, version_json = self.request_api(api=f"https://api.live.bilibili.com/xlive/app-blink/v1/liveVersionInfo/getHomePageLiveVersion?{query}",
                                                cookies=cookies, headers=header, method=self.ApiMethods.GET, success_msg="直播姬版本信息获取成功！")
      if not success or version_json['code'] != 0:
          raise Exception(version_json)

      data = dt.start_data.copy()
      data['room_id'] = self.room_id.get()
      data['csrf_token'] = data['csrf'] = self.csrf.get()
      data['area_v2'] = area_id
      data['build'] = version_json['data']['build']
      data['version'] = version_json['data']['curr_version']
      success, resp = self.request_api(api="https://api.bilibili.com/x/report/click/now", headers=header,
                                        method=self.ApiMethods.GET, success_msg="时间戳获取成功！")
      if not success or resp['code'] != 0:
          raise Exception(resp)
      data['ts'] = resp["data"]["now"]
      data = appsign(data, app_key, app_sec)

      # 设置直播标题
      title_data = dt.title_data.copy()
      title_data['room_id'] = self.room_id.get()
      title_data['csrf_token'] = title_data['csrf'] = self.csrf.get()
      title_data['title'] = self.live_title.get()

      # 发送设置标题请求
      success, title_response = self.request_api(api="https://api.live.bilibili.com/room/v1/Room/update", cookies=cookies,
                                        headers=header, data=title_data, method=self.ApiMethods.POST, success_msg="更新直播标题请求成功！")
      if not success or title_response['code'] != 0:
          raise Exception(title_response)
      self.log_message("直播标题设置成功！")

      # 获取推流码
      self.log_message("正在获取直播推流码...")
      response: dict
      success, response = self.request_api(api="https://api.live.bilibili.com/room/v1/Room/startLive", cookies=cookies,
                                        headers=header, data=data, method=self.ApiMethods.POST, success_msg="开始直播请求成功！")
      if not success:
          self.log_message("获取推流码失败！")
          messagebox.showerror("错误", "获取推流码失败，详细错误信息请查看日志！")
          raise Exception(response)
      else:
          if response['code'] == 60024:
              self.log_message("获取推流码失败: 需要进行人脸认证！")
              messagebox.showinfo("提示", "获取推流码失败: 请扫码进行人脸认证！")
              qr: str = response['data']['qr']
              self.root.after(0, lambda: self.show_qr_code(qr))
              return
          elif response['code'] != 0:
              self.log_message(f"获取推流码失败！")
              messagebox.showerror("错误", "获取推流码失败，详细错误信息请查看日志！")
              raise Exception(response)

      # 获取推流信息
      rtmp_addr = response['data']['rtmp']['addr']
      rtmp_code = response['data']['rtmp']['code']
      self.log_message("获取推流码成功！")

      # 更新UI
      self.root.after(0, lambda: self._update_after_start(rtmp_addr, rtmp_code))

      self.log_message("直播已开启！请使用推流码进行直播！")
      messagebox.showinfo("成功", "直播已开启！请使用推流码进行直播！")

  except Exception as e:
      self.log_message(f"开始直播时出错: {str(e)}")
      messagebox.showerror("错误", "开始直播出错")
  finally:
      self.root.after(0, lambda: self.start_btn.config(state=tk.NORMAL))