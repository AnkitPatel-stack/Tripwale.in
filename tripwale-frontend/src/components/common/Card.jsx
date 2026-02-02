const Card = ({ children, className = '', hover = true }) => {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${hover ? 'card-hover' : ''} ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = '' }) => {
    return (
      <div className={`p-6 border-b ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardBody = ({ children, className = '' }) => {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardFooter = ({ children, className = '' }) => {
    return (
      <div className={`p-6 border-t bg-gray-50 ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;