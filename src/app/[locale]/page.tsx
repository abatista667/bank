import { redirect } from "@/i18n/routing";
import { routes } from "../constants/routes";

export default async function Home() {

  redirect({href: routes.accountList, locale: 'en'});
  return <></>;
}
