import { helper } from '@ember/component/helper';

export function isActive([routeName, activeRoute,mail]/*, hash*/) {
    //console.log(routeName,activeRoute,mail);
    if(mail==null){
     return activeRoute === routeName;
   } else {
     return (activeRoute)==(routeName+"/"+mail.get('id'));
   }
}
export default helper(isActive);
