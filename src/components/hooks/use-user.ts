import { queryOptions, useQuery } from '@tanstack/solid-query';
import { Store } from '@tanstack/solid-store';
import { createStore } from '@tanstack/store';
import {
	createEffect,
	createRenderEffect,
	createSignal,
	onCleanup,
} from 'solid-js';

// 建议给 createHighPrecisionClock 增加一个返回格式，方便合并
export const createHighPrecisionClock = () => {
	const startSystemTime = Date.now();
	const startPerfTime = performance.now();
	const [timestamp, setTimestamp] = createSignal(startSystemTime);

	const update = () => {
		setTimestamp(startSystemTime + (performance.now() - startPerfTime));
		requestAnimationFrame(update);
	};

	const frameId = requestAnimationFrame(update);
	onCleanup(() => cancelAnimationFrame(frameId));

	// 这里我们返回信号本身，或者一个计算后的对象
	return () => ({
		time: new Date(timestamp()).toLocaleString(),
		utcTime: new Date(timestamp()).toISOString(),
	});
};

export const ipQuery = queryOptions({
	queryKey: ['ip'],
	queryFn: async () => {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		console.log('IP:', data);
		return data.ip as string;
	},
});
export const regionRequest = (ip?: string) =>
	queryOptions({
		queryKey: ['region', ip],
		queryFn: async () => {
			const response = await fetch(`https://ipapi.co/${ip}/json`);
			const data = await response.json();
			console.log('Region:', data);
			return data.region as string;
		},
		enabled: ip !== undefined,
	});

export const getUserAgent = () => {
	const { navigator } = window;
	// 获取用户代理
	const userAgent = navigator.userAgent || 'unknown';
	// 获取语言和时区
	const language = navigator.language || 'unknown';
	const timeZone =
		Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
	const userAgent_lower = userAgent.toLowerCase();
	const ua = navigator.userAgent.toLowerCase();
	const os = ua.includes('android')
		? 'Android'
		: ua.includes('win')
			? 'Windows'
			: ua.includes('iphone') || ua.includes('ipad')
				? 'iOS'
				: ua.includes('mac')
					? 'MacOS'
					: ua.includes('linux')
						? 'Linux'
						: 'unknown';
	const browser =
		ua.includes('chrome') && !ua.includes('edg')
			? 'Chrome'
			: ua.includes('firefox')
				? 'Firefox'
				: ua.includes('safari') && !ua.includes('chrome')
					? 'Safari'
					: ua.includes('edg')
						? 'Edge'
						: ua.includes('opera') || ua.includes('opr')
							? 'Opera'
							: ua.includes('msie') || ua.includes('trident')
								? 'Internet Explorer'
								: 'unknown';
	const device = ua.includes('mobile')
		? 'Mobile'
		: ua.includes('tablet')
			? 'Tablet'
			: 'Desktop';

	return {
		userAgent,
		language,
		timeZone,
		os,
		device,
		browser,
		ip: 'loading',
		region: 'loading',
	};
};
export function useUserEnv() {
	const { data: ip, isLoading, isError, error } = useQuery(() => ipQuery);
	const {
		data: region,
		isLoading: regionLoading,
		isError: regionIsError,
		error: regionError,
	} = useQuery(() => regionRequest(ip));

	return () => ({
		...getUserAgent(),
		ip: ip ? ip : isLoading ? 'loading' : isError ? error.message : 'unknown',
		region: region
			? region
			: regionLoading
				? 'loading'
				: regionIsError
					? regionError.message
					: 'unknown',
	});
}
