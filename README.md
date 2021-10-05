# MIDO

Mido website is your pocket-size health-tracking and optimization system that helps you make lifestyle and nutrition choices based on your body's data

The mido system uses a test card, that measures 10 biomarkers in your urine using colorimetric assays. These assays trigger a color change when the biomarker is detected in your urine, the larger the color changes the higher the concentration of the biomarker The mido system is powered by computer vision and AI, which allow for rapid results and give you actionable tips on how to improve your health status mido allows for tracking of 5 different health parameters.

## Demo

- [Mido website](https://mido-app-new.web.app/home)

## User Journey

![user journey](https://user-images.githubusercontent.com/49689787/135058743-e9730a17-6cc3-4a9b-846f-e82664e4618c.png)

## User Stories

### Registration MIDO account

- As an user, I want to be able to create an account so that I can use the application
- As an user, I want to be able to receive a confirmation that the account has been created, so I know it happened
- As an user, I want to be able to login with my account, so I can use the application
- As an user, I want to be able to reset the password, so I can access the account when I forget it
- As an user, I want to the password to have some minimal requirements (Capital letter and some numbers, and minimum of 6 characters), so I feel comfortable with sharing my information
- As an user, I want to be able to let the application remember my credentials so I can login the application in a seamless way

### Home Page

- As an user, I want to be able to access main application pages from the home page
- As an user, I want to be able to know when I have new results uploaded to the app in a visual way, so I know when new results have been uploaded
- As an user, I want to be able to know how many tests I have left, so I can plan to reorder cards

### Photo Upload

- As an user, I want to be able to upload a photo from the phone in an seamless way, so I can get my results
- As an user, I want to be able to communicate changes on my lifestyle during the week, so that my results can be correlated with what I did during the testing period (usually a week)
- As an user, I want a response from the application, so I know that the photo was uploaded correctly (Alert + email?)
- As an user, I want a response from the application if the photo upload fails (Alert?)

### Results page

- As an user, I want to be able to see a summary of the results on the first screen, so I can quickly scan how am I doing that week
- As an user, I want to be able to see my progression on the first screen, so I know whether I’m improving or getting worse in a quick manner
- As an user, I want to be able to compare myself with the average results from people my age, so I know how I’m performing compared to them
- As an user, I want to be able to see the areas where I can improve my health in a quick manner, so I can work on them during the testing period (usually 1 week)
- As an user, I want to be able to see all the recommendations in a few sentences of text, so I can quickly scan them, and have the option to read more by clicking on it
- As an user, I want to be able to dive deeper into the health parameters and see how am I performing in each of the tests over time, so I can understand where am I improving or worsening and how to get better
- As an user, I want to be able to access the results from past dates, so I can understand better how am I performing
- As an user, I want to be able to see graphs that correlate my weekly habits and some of the health parameters (water intake vs hydration), so I can understand how what I do change my results
- As an user I want to be able to define what values I see first in the summary result page, so that the web app can feel more personalized to me
- As an user I want to be able to define how many tests I visualize on the graphs at the time, so that I can compare my progression in relevant dates to me

### Profile page

- As an user, I want to be able to create a profile with my information, so that my information is stored somewhere and can be used by mido system to tailor recommendations to me
- As an user, I want to be able to update my profile, so that if any information changes I can update it
- As an user, I want to be able to update my password in my profile page, so that if I have the chance to change it somewhere inside the web app
- As an user I want to be able to see a summary of all my results in my profile page, so that I have my information on my progression there

## Getting Started

These steps to run project locally.

### Prerequisites

1. [nodejs](https://nodejs.org/en/download/)
2. [git](https://git-scm.com/download/)

3. angular cli: run this command

   ```
   npm install -g @angular/cli@12.0.5
   ```

4. firebase-tools: (optional) to control your project in firebase like: deploy ...etc

   ```
   npm install -g firebase-tools
   ```

### Installation

1. Clone the repo

   ```
   https://github.com/MiProbes/MiProbes.git
   ```

2. Install NPM packages

   ```
   npm install
   ```

3. Create firebase-config.ts file in directory. Then paste firebase project configuration
   ```
   export const firebaseConfig = {
     // Paste your configuration here
   };
   ```

### Run project

Run project locally using this command:

```
ng serve -o
```

**Notes**: you might have a problem with run this command first time especially in Windows. to fix it run below command.

```
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Tests

There are some of unit and integration tests using Jasmine & Karma that are built-in in Angular. run tests by this command

```
ng test
```

## Tech-Stack

1. Angular
2. Angular material
3. ng-circle-progress
4. ng2-charts
5. ngx-image-cropper
6. firebase

## Suggestions for future development Website

- Signup & sign-in by google account or Facebook ...etc. this makes the registration process easy and faster, in addition to existing auth.
- Building dashboard panel to give you more control and edit anything easily.
- Adding chatting feature to the website.
- Adding a blog section that has relevant articles in health and diet.
- Calendar section in the profile page to manage client's tests, and send a message on their phone to remember them.
- More graphs on the result page.
- Validate image type and size before upload.
- Use a real server instead of firebase.
- The results dealt with are just fake results, so it requires linking to a real server to display them.
