import React from 'react';

const SocialButton = ({ icon: Icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center gap-3 w-full py-3.5 px-4
        bg-white/5 border border-white/10 rounded-2xl
        text-text-main font-medium transition-all duration-300
        hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      <Icon size={20} />
      <span>{children}</span>
    </button>
  );
};

export default SocialButton;
