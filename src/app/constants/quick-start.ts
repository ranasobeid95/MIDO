import { ROUTES } from './routes';

export const QUICK_START = [
  {
    content: 'Login into the mido app & keep your profile updated',
    img: '../../assets/images/step-1.png',
    icon: 'account_circle',
    details: [
      {
        header: '',
        content:
          'Mido health optimization system uses your profile information along with your test results, to give you personalized health insights to keep you performing your best! Keep your health goals, diet and other profile info up to date!!',
      },
    ],
    link: [ROUTES.SETTING_ACCOUNT, 'account'],
    linkIcon: 'Update your profile',
  },
  {
    content: 'Urinate on the mido card,for a few seconds',
    img: '../../assets/images/step-2.icons.png',
    icon: 'add_photo_alternate',
    details: [
      {
        header: ' Sample timing',
        content:
          ' since this is not a diagnostic test, you can take the test whenever its most convenient for you.',
      },
      {
        header: 'Sample collection',
        content:
          'avoid the initial stream of urine. Urinate on the mido card for 2 seconds- wetting all the boxes under the arrow.',
      },
      {
        header: 'Testing frequency',
        content:
          ' mido system is designed to be used once a week, but you can test as frequent as you wish!',
      },
    ],

    link: ['/', ROUTES.NEW_TEST_PAGE],
    linkIcon: 'NEW TEST +',
  },
  {
    content: 'Wait 2 min rest the card on absorbent paper',
    img: '../../assets/images/step-3.icons.png',
    icon: 'add_photo_alternate',
    details: [
      {
        header: '',
        content:
          'After urinating on the mido card, wait between 1-2 minutes before taking the photo. Longer times will cause invalid results',
      },
    ],

    link: ['/', ROUTES.NEW_TEST_PAGE],
    linkIcon: 'NEW TEST +',
  },
  {
    content: 'Take & upload your mido card photo to the app',
    img: '../../assets/images/step-4.icons.png',
    icon: 'add_photo_alternate',
    details: [
      {
        header: 'Photo Taking',
        content:
          'Place the mido card on a flat surface. Make sure you have good lighting and please, no-flash.\n Upload the photo to the web app in its original size, in a common format: e.g. jpeg, tiff, png. When your picture has been uploaded successfully you will receive a message and an e-mail notification!',
      },
    ],

    link: ['/', ROUTES.NEW_TEST_PAGE],
    linkIcon: 'NEW TEST +',
  },
  {
    content: 'Check your results and health insights!',
    img: '../../assets/images/step-5.icons.png',
    icon: 'insert_chart',
    details: [
      {
        header: 'Results',
        content:
          'You will receive an e-mail notification when your results are updated in the web-app. This can take a couple hours🕖',
      },
    ],
    link: ['/', ROUTES.RESULTS_PAGE],
    linkIcon: 'Results',
  },
];
