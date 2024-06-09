import {HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  })
  return next(request);
};
