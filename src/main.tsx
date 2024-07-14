import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import ReduxProvider from '@redux/provider'
import { AppRoutes } from './routes/AppRoutes'
import { ConfirmationProvider } from '@contexts/confirmation'
import { ConfirmationModal } from '@components/ConfirmationModal'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<HelmetProvider>
				<BrowserRouter>
					<Suspense>
						<ConfirmationProvider>
							<ConfirmationModal />
							<AppRoutes />
						</ConfirmationProvider>
					</Suspense>
				</BrowserRouter>
			</HelmetProvider>
		</ReduxProvider>
	</React.StrictMode>,
)
