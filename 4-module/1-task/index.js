function makeFriendsList(friends) {
  // ваш код...
  let friendsCon = friends.map(item => item.firstName + " " + item.lastName);

  let ul = document.createElement('ul');
  
  for (let key of friendsCon) {
    let li = document.createElement('li');
    li.innerHTML = key;
    ul.append(li);
  }
  return ul;
}
