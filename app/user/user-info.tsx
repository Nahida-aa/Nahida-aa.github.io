"use client"
import { useUserEnvironment } from '@/hooks/use-user';
import React from 'react';

type UserInfoProps = {
  className?: string;
};
export const UserInfo = (
  props: UserInfoProps
) => {
  const { userAgent, language, region, timeZone, os, browser, ip } = useUserEnvironment();

  return (
    <div className={props.className}>
      <h1>用户环境信息</h1>
      <p>用户代理：{userAgent}</p>
      <p>语言偏好：{language}</p>
      <p>地区：{region}</p>
      <p>时区：{timeZone}</p>
      <p>操作系统：{os}</p>
      <p>浏览器：{browser}</p>
      <p>IP 地址：{ip}</p>
    </div>
  );
}