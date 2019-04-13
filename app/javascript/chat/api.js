/* eslint-disable import/prefer-default-export */
export function logout() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  return fetch('/users/sign_out', {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  }).then((response) => {
    if (response.ok) {
      window.location = '/users/sign_in';
    }
  });
}
