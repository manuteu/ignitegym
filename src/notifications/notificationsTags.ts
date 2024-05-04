import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate({ user_name, user_email }: any) {
  OneSignal.User.addTags({
    user_name,
    user_email,
  });
}

export function tagLastExercise(daysCount: string) {
  OneSignal.User.addTag("last_exercise_days", daysCount)
}