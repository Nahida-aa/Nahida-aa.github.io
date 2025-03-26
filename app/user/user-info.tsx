"use client"
import { useUserEnvironment } from '@/hooks/use-user';
import React, { JSX, use, useEffect, useState } from 'react';

type UserInfoProps = {
  className?: string;
};
export const UserInfo = (
  props: UserInfoProps
) => {
  // const { userAgent, language, region, timeZone, currentTime, timeZoneTime,  os, browser, ip } = useUserEnvironment();
  const userEnvironment = useUserEnvironment();
//   const userInfoCodeTs = `// 用户环境信息
// userAgent = ${userAgent}
// language = ${language}
// region = ${region}
// timeZone = ${timeZone}
// os = ${os}
// browser = ${browser}
// ip = ${ip}`;
  // useEffect(() => {
  //   console.log('Rendered on client');

  //   // 定义一个异步函数来处理高亮逻辑
  //   const fetchHighlight = async () => {
  //     const highlightedCode = await highlight(userInfoCodeTs, 'ts');
  //     setInitial(highlightedCode);
  //   };

  //   fetchHighlight(); // 调用异步函数
  // }, []); // 添加依赖项，确保在 `userInfoCodeTs` 变化时重新执行

  return (
    <div className={props.className}>
      <pre>
        {JSON.stringify(userEnvironment, null, 2)}
      </pre>
    </div>
  );
}