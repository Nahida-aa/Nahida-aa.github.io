import { useQuery } from '@tanstack/solid-query';
import { useSelector } from '@tanstack/solid-store';
import { AppLayout } from '#/layouts/appLayout.tsx';
import {
	createHighPrecisionClock,
	getUserAgent,
	ipQuery,
	regionRequest,
	useUserEnv,
} from './use-user';

function UserInfoInner() {
	const clock = createHighPrecisionClock();
	const ipState = useQuery(() => ipQuery);
	const ip = () =>
		ipState.data
			? ipState.data
			: ipState.isLoading
				? 'loading'
				: ipState.isError
					? ipState.error.message
					: 'unknown';
	// const region = useQuery(() => regionRequest(ip.data));
	return (
		<div class={`mx-2 max-w-full `}>
			<pre class="mx-2 overflow-auto overflow-x-auto">
				{JSON.stringify(
					{
						...clock(),
						...getUserAgent(),
						ip: ip(),
						// region: region.data
						// 	? region.data
						// 	: region.isLoading
						// 		? 'loading'
						// 		: region.isError
						// 			? region.error.message
						// 			: 'unknown',
					},
					null,
					2,
				)}
			</pre>
		</div>
	);
}

export const UserInfo = () => (
	<AppLayout>
		<UserInfoInner />
	</AppLayout>
);
