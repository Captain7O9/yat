// dark/light favicon (blatantly copied from stackoverflow)

lightSchemeIcon = document.querySelector('link#light-scheme-icon');
darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
onUpdate();

function onUpdate() {
  if (matcher.matches) {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }
}
