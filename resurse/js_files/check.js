function ch(what) {
  var list = what.form[what.name];
  for (var i = 0, l = list.length; i < l; i++)
    if (what.checked)
      if (list[i] != what) list[i].checked = false;
      else;
    else list[i].checked = true;
}
