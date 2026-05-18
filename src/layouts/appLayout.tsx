import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import {
	createContext,
	createSignal,
	For,
	type JSX,
	Show,
	Suspense,
	useContext,
} from 'solid-js';

export const AppLayout = (props: { children: JSX.Element }) => {
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<Suspense fallback={'Loading'}>{props.children}</Suspense>
		</QueryClientProvider>
	);
};
