/*
 * escaping special characters
 *
 * арнайы символдарды оқшаулап бөліп береді. Бұл XSS шабуылынан
 * және mysql инекциядан қорғайды
 */

var str = '"Жасымда ғылым бар * & $ деп ескермедім\' < Абай Құнанбайұлы > &"';

var templ = '"<>&\'';
var r = ['&quot', '&lt', '&gt', '&amp', '&#039'];
var temp = '';

for (var i=0; i<str.length; i++) {
  var j = templ.indexOf(str.charAt(i));
  temp += ((j<0) ? str.charAt(i) : r[j]);
}
