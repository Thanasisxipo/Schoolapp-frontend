import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const user = userService.user();

  if (!user) {
    router.navigate(['login']);
    return false;
  }

  const role = userService.getRole();

  if (role === "ADMIN") {
    if (expectedRole === 'ADMIN') {
      return true;
    }
    return router.parseUrl('admin-dashboard');
  } else if (role === "TEACHER") {
    if (expectedRole === 'TEACHER') {
      return true;
    }
    return router.parseUrl('teacher-dashboard');
  } else if (role === "STUDENT") {
    if (expectedRole === 'STUDENT') {
      return true;
    }
    return router.parseUrl('student-dashboard');
  } else {
    router.navigate(['login']);
    return false;
  }
  // const userService = inject(UserService);
  // const router = inject(Router);

  // const expectedRole = route.data['expectedRole'];
  // if (!userService.user()) {
  //   router.navigate(['login']);
  //   return false;
  // }

  // const role = userService.getRole();
  

  // if (role !== expectedRole) {
  //   if (role === "ADMIN") {
  //     router.navigate(['admin-dashboard']);
  //     return true;
  //   } else if (role === "TEACHER") {
  //     router.navigate(['teacher-dashboard']);
  //     return true;
  //   } else if (role === "STUDENT") {
  //     router.navigate(['student-dashboard']);
  //     return true;
  //   }
  // }

  // if (userService.user()) {
  //   return true;
  // }

  // return router.navigate(['login']);
};
