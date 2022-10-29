import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51LuoxFLyNSCVZxd0DHXkH35OtNSelMJXMu44vPmj2D4RH8LH8oyDbm1XbueUta8OOEkfd1vJz60eL2fRQdQ45ujJ00rMEsinZh'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
