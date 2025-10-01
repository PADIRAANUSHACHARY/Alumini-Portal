const API_URL = 'http://localhost:3000/users';

//get data if email matched from db.json api url
async function getUserData(email) {
  const resp = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  const users = await resp.json();
  // if users.length < 0 no data is fetched so we return null else we return users data
  return users.length > 0 ? users[0] : null;
}

//update function to update in the db.json using PUT method in json format if resp.ok is true then successfully updated else not success 
// async function updateUserData(userId, data) {
//   const resp = await fetch(`${API_URL}/${userId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return resp.ok;
// }

async function updateUserData(userId, data) {
  const resp = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return resp.ok;
}
//upon loading the data it fetches the user id from local storage then then gets the user data from getUserData() method using email and fills the form automatically
window.onload = async () => {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    alert("No logged-in user found! Please login.");
    return;
  }

  const user = await getUserData(email);
  console.log(user)
  if (!user) {
    alert("User data not found");
    return;
  }
  document.getElementById('empnum').value = user.id || '';
  document.getElementById('fullname').value = user.fullname || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('phone').value = user.phone || '';
  document.getElementById('bio').value = user.bio || '';
  // document.getElementById('profile-form').dataset.userid = user.id;
};

// //when a request is made to change password or bio or phone number using submit button this gets called
// document.getElementById('profile-form').addEventListener('submit', async function (e) {
//   e.preventDefault();
//   const userId = this.dataset.userid;
//   if (!userId) {
//     alert("User ID missing");
//     return;
//   }
//   //updateProfile to store the current values
//   const updatedProfile = {
//     fullname: this.fullname.value.trim(),
//     email: this.email.value.trim(),
//     phone: this.phone.value.trim(),
//     bio: this.bio.value.trim(),
//   };
//   console.log("updatedlist")
//   //updating the password
//   const newPassword = this.password.value;
//   if (newPassword) {
//     updatedProfile.password = newPassword;
//   }

//   try {
//     //using updateUserData function we update the data in the db.json file
//     const success = await updateUserData(userId, updatedProfile);
//     console.log("successnext")
//     if (success) {
//       alert('Profile updated successfully!');
//       this.password.value = '';
//     } else {
//       alert('Failed to update profile');
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Error updating profile');
//   }
// });

document.getElementById('profile-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get user ID from empnum input field
  const userId = document.getElementById('empnum').value.trim();
  if (!userId) {
    alert("User ID missing");
    return;
  }

  const updatedProfile = {
    fullname: this.fullname.value.trim(),
    email: this.email.value.trim(),
    phone: this.phone.value.trim(),
    bio: this.bio.value.trim(),
  };

  const newPassword = this.password.value;
  if (newPassword) {
    updatedProfile.password = newPassword;
  }

  try {
    //using updateUserData function we update the data in the db.json file
    const success = await updateUserData(userId, updatedProfile);
    if (success) {
      alert('Profile updated successfully!');
      this.password.value = '';
    } else {
      alert('Failed to update profile');
    }
  } catch (err) {
    console.error(err);
    alert('Error updating profile');
  }
});

