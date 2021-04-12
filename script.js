(function () {
  var removeActive = function ($wrapper) {
    var $active = $wrapper.querySelectorAll('.is-active');

    $active.forEach(function (element) {
      element.classList.remove('is-active');

      if (element.classList.contains('tab-heading')) {
        element.children[0].setAttribute('aria-selected', 'false');
      }

      if (element.classList.contains('tab-panel')) {
        element.setAttribute('aria-hidden', 'true');
      }
    });
  };

  var setActive = function (target) {
    var $wrapper = target.closest('.tabs');
    var id = target.id;
    var $panel = $wrapper.querySelector('[aria-labelledby="' + id + '"]');
    var $heading = target.parentElement;
    var $links = $wrapper.querySelectorAll('.tabs');

    if ($heading.classList.contains('is-active')) {
      return;
    }

    removeActive($wrapper);

    $links.forEach(function ($link) {
      $link.setAttribute('tabindex', $link.id === id ? '0' : '-1');
    });

    /**
     * Set the aria selected link to be true on the active target.
     */
    target.setAttribute('aria-selected', 'true');
    target.parentElement.classList.add('is-active');

    $panel.setAttribute('aria-hidden', 'false');
    $panel.classList.add('is-active');
  };

  var setListeners = function (tabs) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setActive(this);
      });
    });
  };

  var init = function () {
    var instances = document.querySelectorAll('.tabs');

    instances.forEach(function (instance) {
      var tabs = instance.querySelectorAll('.tab-trigger');

      setListeners(tabs);
    });
  };

  // init();
})();
