import { useEffect, useState } from 'react';

interface UserEnvironment {
  language: string; // 用户的语言偏好
  region: string;   // 用户的地区
  os: string;       // 当前操作系统
  browser: string;  // 当前浏览器
  ip: string;       // 用户的 IP 地址
}

export function useUserEnvironment(): UserEnvironment {
  const [environment, setEnvironment] = useState<UserEnvironment & { ip: string }>({
    language: '',
    region: '',
    os: '',
    browser: '',
    ip: '',
  });

  useEffect(() => {
    // 获取语言和 时间区域
    const language = navigator.language || 'unknown';
    const region = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

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
        fetchLocation(data.ip); // 获取地理位置
      } catch (error) {
        console.error('Failed to fetch IP address:', error);
      }
    };
    // 获取地理位置
    const fetchLocation = async (ip: string) => {
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
    fetchIp();
    // 更新状态
    setEnvironment({
      language,
      region,
      os,
      browser,
      ip: '',
    });
  }, []);

  return environment;
}