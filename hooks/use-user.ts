import { useEffect, useState } from 'react';

interface UserEnvironment {
  language: string; // 用户的语言偏好
  region: string;   // 用户的地区（通过 IP 获取）
  timeZone: string; // 用户的时区
  os: string;       // 当前操作系统
  browser: string;  // 当前浏览器
  ip: string;       // 用户的 IP 地址
}

export function useUserEnvironment(): UserEnvironment {
  const [environment, setEnvironment] = useState<UserEnvironment>({
    language: '',
    region: '',
    timeZone: '',
    os: '',
    browser: '',
    ip: '',
  });

  useEffect(() => {
    // 获取语言和时区
    const language = navigator.language || 'unknown';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

    // 检测操作系统
    const userAgent = navigator.userAgent.toLowerCase();
    let os = 'unknown';
    if (userAgent.includes('win')) os = 'Windows';
    else if (userAgent.includes('mac')) os = 'MacOS';
    else if (userAgent.includes('linux')) os = 'Linux';
    else if (userAgent.includes('android')) os = 'Android';
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) os = 'iOS';

    // 检测浏览器
    let browser = 'unknown';
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) browser = 'Chrome';
    else if (userAgent.includes('firefox')) browser = 'Firefox';
    else if (userAgent.includes('safari') && !userAgent.includes('chrome')) browser = 'Safari';
    else if (userAgent.includes('edg')) browser = 'Edge';
    else if (userAgent.includes('opera') || userAgent.includes('opr')) browser = 'Opera';
    else if (userAgent.includes('msie') || userAgent.includes('trident')) browser = 'Internet Explorer';

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
      language,
      timeZone,
      os,
      browser,
    }));
  }, []);

  return environment;
}