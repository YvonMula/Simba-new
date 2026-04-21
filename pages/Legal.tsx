import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const Legal: FC = () => {
  const { pathname } = useLocation();
  const isTerms = pathname === '/terms';
  const title = isTerms ? 'Terms & Conditions' : 'Privacy Policy';
  const icon = isTerms ? <FileText size={48} className="text-simba-orange" /> : <ShieldCheck size={48} className="text-simba-blue" />;

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
           <div className="flex justify-center mb-6">{icon}</div>
           <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
           <p className="text-gray-400 max-w-2xl mx-auto">
             Last Updated: {new Date().toLocaleDateString()}
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-simba-orange font-bold hover:underline mb-8">
           <ArrowLeft size={18} /> Back to Home
        </Link>
        
        <div className="prose prose-lg max-w-none text-gray-600">
           <p className="lead text-xl text-gray-800 font-medium mb-8">
             Welcome to Simba Supermarket Online. By accessing or using our website, you agree to be bound by these {title.toLowerCase()}.
           </p>

           <h3 className="text-gray-900 font-bold text-2xl mb-4">1. Introduction</h3>
           <p className="mb-6">
             Simba Supermarket ("we", "us", "our") provides this website to you subject to the following conditions. 
             If you visit or shop at Simba Online, you accept these conditions. Please read them carefully.
           </p>

           <h3 className="text-gray-900 font-bold text-2xl mb-4">2. {isTerms ? 'Use of Site' : 'Data Collection'}</h3>
           <p className="mb-6">
             {isTerms 
               ? "You may use the site only for lawful purposes. You are prohibited from violating or attempting to violate the security of the website, including, without limitation, accessing data not intended for you or logging onto a server or an account which you are not authorized to access."
               : "We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, or communicate with us. This information may include your name, email address, phone number, and delivery address."}
           </p>

           <h3 className="text-gray-900 font-bold text-2xl mb-4">3. {isTerms ? 'Order Acceptance' : 'Use of Information'}</h3>
           <p className="mb-6">
             {isTerms
               ? "Please note that there may be certain orders that we are unable to accept and must cancel. We reserve the right, at our sole discretion, to refuse or cancel any order for any reason."
               : "We use the information we collect to provide, maintain, and improve our services, such as to process transactions, deliver products, and send you related information, including confirmations and invoices."}
           </p>

           <h3 className="text-gray-900 font-bold text-2xl mb-4">4. Contact Us</h3>
           <p>
             If you have any questions about this {title}, please contact us at <a href="mailto:support@simba.rw" className="text-simba-orange font-bold hover:underline">support@simba.rw</a>.
           </p>
        </div>
      </div>
    </div>
  );
};