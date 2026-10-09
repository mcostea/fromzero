import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import Privacy from '@/pages/Privacy';
import { I18nProvider } from '@/i18n';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <I18nProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </I18nProvider>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
