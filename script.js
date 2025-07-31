const payButton = document.getElementById('payButton');

payButton.addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const sender = accounts[0];

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: sender,
          to: '0xYourWalletAddressHere', // Replace with your MetaMask wallet
          value: '0x2386F26FC10000' // 0.01 ETH in hex
        }]
      });

      alert('Payment sent successfully!');
    } catch (err) {
      console.error(err);
      alert('Transaction failed.');
    }
  } else {
    alert('MetaMask not found. Please install it to make payments.');
  }
});

const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('show');
  current = (current + 1) % slides.length;
  slides[current].classList.add('show');
}, 5000); // change image every 5 seconds

