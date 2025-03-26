import { useEffect, useState } from 'react';

interface UserEnvironment {
  userAgent: string; // 用户的 User-Agent
  language: string; // 用户的语言偏好
  region: string;   // 用户的地区（通过 IP 获取）
  timeZone: string; // 用户的时区
  currentTime: string; // 当前时间（本地时间）
  // timeZoneTime: string; // 对应时区的时间
  utcTime: string;  // UTC 时间
  os: string;       // 当前操作系统
  browser: string;  // 当前浏览器
  ip: string;       // 用户的 IP 地址
}

export function useUserEnvironment(): UserEnvironment {
  const [environment, setEnvironment] = useState<UserEnvironment>({
    userAgent: '',
    language: '',
    region: '',
    timeZone: '',
    currentTime: '',
    // timeZoneTime: '',
    utcTime: '',
    os: '',
    browser: '',
    ip: '',
  });

  useEffect(() => {
    const { navigator } = window;
    // 获取用户代理
    const userAgent = navigator.userAgent || 'unknown';
    // 获取语言和时区
    const language = navigator.language || 'unknown';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    // 获取当前时间
    // const currentTime = new Date().toLocaleString(); // 本地时间
    // // 指定时区的时间
    // const timeZoneTime = new Date().toLocaleString('en-US', { timeZone });

    // 检测操作系统
    const userAgent_lower = userAgent.toLowerCase();
    let os = 'unknown';
    if (userAgent_lower.includes('android')) os = 'Android';
    else if (userAgent_lower.includes('win')) os = 'Windows';
    else if (userAgent_lower.includes('mac')) os = 'MacOS';
    else if (userAgent_lower.includes('iphone') || userAgent_lower.includes('ipad')) os = 'iOS';
    else if (userAgent_lower.includes('linux')) os = 'Linux';

    // 检测浏览器
    let browser = 'unknown';
    if (userAgent_lower.includes('chrome') && !userAgent_lower.includes('edg')) browser = 'Chrome';
    else if (userAgent_lower.includes('firefox')) browser = 'Firefox';
    else if (userAgent_lower.includes('safari') && !userAgent_lower.includes('chrome')) browser = 'Safari';
    else if (userAgent_lower.includes('edg')) browser = 'Edge';
    else if (userAgent_lower.includes('opera') || userAgent_lower.includes('opr')) browser = 'Opera';
    else if (userAgent_lower.includes('msie') || userAgent_lower.includes('trident')) browser = 'Internet Explorer';

    // 获取 IP 地址
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setEnvironment((prev) => ({
          ...prev,
          ip: data.ip,
        }));
        fetchRegion(data.ip); // 获取地理位置
      } catch (error) {
        console.error('Failed to fetch IP address:', error);
      }
    };

    // 获取地理位置（地区）
    const fetchRegion = async (ip: string) => {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        setEnvironment((prev) => ({
          ...prev,
          region: data.regionName || 'unknown', // 返回更准确的地区
        }));
      } catch (error) {
        console.error('Failed to fetch location:', error);
      }
    };

    // 初始化数据
    fetchIp();
    setEnvironment((prev) => ({
      ...prev,
      userAgent,
      language,
      timeZone,
      // currentTime,
      // timeZoneTime,
      os,
      browser,
    }));
  }, []);
  useEffect(() => {
    const updateTime = () => {
      const timeZone = environment.timeZone;

      // 本地时间
      const currentTime = new Date().toLocaleString();

      // 指定时区的时间
      // const timeZoneTime = new Date().toLocaleString();
      // UTC 时间
      const utcTime = new Date().toISOString(); // ISO 格式的 UTC 时间

      setEnvironment((prev) => ({
        ...prev,
        currentTime,
        // timeZoneTime,
        utcTime,
      }));
    };

    // 初始化时间
    updateTime();

    // 每秒更新一次时间
    const interval = setInterval(updateTime, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, [environment.timeZone]);

  return environment;
}