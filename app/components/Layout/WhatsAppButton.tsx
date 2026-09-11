export default function WhatsAppButton() {
  const phoneNumber = "27610787124"; // no leading 0, country code first
  const message =
    "Hi Retreat RFC, I'd like more info about the club and how to sign up.";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Retreat RFC on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 border-2 border-black transition-colors shadow-lg shadow-purple-900/50"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.396.63 4.712 1.827 6.75L4 29l7.42-1.798a11.94 11.94 0 0 0 4.581.916h.005c6.627 0 12-5.373 12-12.001C28.006 8.373 22.633 3 16.001 3zm0 21.6h-.004a9.55 9.55 0 0 1-4.87-1.334l-.35-.208-3.63.88.968-3.54-.228-.363a9.56 9.56 0 0 1-1.474-5.034c0-5.29 4.307-9.598 9.598-9.598 2.564 0 4.973.999 6.786 2.813a9.53 9.53 0 0 1 2.812 6.79c-.001 5.29-4.308 9.594-9.608 9.594zm5.264-7.19c-.288-.144-1.706-.842-1.97-.938-.264-.096-.457-.144-.649.144-.192.288-.745.938-.913 1.13-.168.192-.336.216-.624.072-.288-.144-1.216-.448-2.317-1.43-.857-.764-1.436-1.708-1.604-1.996-.168-.288-.018-.444.126-.588.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.649-1.566-.889-2.146-.234-.564-.472-.488-.649-.497l-.553-.01a1.06 1.06 0 0 0-.769.36c-.264.288-1.008.985-1.008 2.402 0 1.417 1.032 2.786 1.176 2.978.144.192 2.03 3.1 4.918 4.347.687.297 1.223.474 1.641.607.689.219 1.316.188 1.812.114.553-.083 1.706-.697 1.946-1.37.24-.672.24-1.248.168-1.37-.072-.12-.264-.192-.552-.336z" />
      </svg>
    </a>
  );
}
