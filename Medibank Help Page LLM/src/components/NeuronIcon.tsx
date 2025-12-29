import brainImage from 'figma:asset/f1d9909a82cb8242d5c3a0267e82dfae9bdf7458.png';

interface NeuronIconProps {
  className?: string;
  size?: number;
}

export function NeuronIcon({ className = "", size = 36 }: NeuronIconProps) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size
      }}
    >
      <img 
        src={brainImage} 
        alt="Medibank Neuron Brain"
        className="w-full h-full object-contain"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' 
        }}
      />
    </div>
  );
}