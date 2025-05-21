import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Rocket, ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-10 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Rocket className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome Aboard!</h1>
        <p className="text-lg text-gray-600 mb-6">
          🎉 You’ve successfully logged in to your account.
          <br />
          Start exploring your dashboard or manage your profile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition duration-200 shadow-md"
          >
            <UserCircle className="w-5 h-5" />
            Go to Profile
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary-light transition duration-200 shadow-sm"
          >
            Explore Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
