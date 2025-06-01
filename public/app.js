// URL вашего прокси. Значение берётся из window.PROXY_URL (см. index.html)
const PROXY_URL = window.PROXY_URL || 'https://your-proxy.example.com/offers';

// load categories and init jstree through the proxy to avoid CORS
const CATEGORIES_URL = PROXY_URL + '/categories';
fetch(CATEGORIES_URL)
  .then(res => res.json())
  .then(data => {
    const buildTree = (items, prefix = '') =>
      (items || []).map(c => {
        const slug = c.slug ? (prefix ? `${prefix}/${c.slug}` : c.slug) : c.id;
        const node = { text: c.name || c.title, data: slug };
        const children = c.children || c.subcategories;
        if (children && children.length) {
          node.children = buildTree(children, slug);
        } else {
          node.icon = 'bi bi-file-earmark';
        }
        return node;
      });

    // the API may return categories in different fields
    const categories =
      (data.data && data.data.categories) || data.categories || data.data || [];
    const treeData = buildTree(categories);
    $('#category-tree').jstree({
      core: { data: treeData }
    }).on('select_node.jstree', (e, d) => {
      if (d.node && d.node.data) {
        document.querySelector('input[name="category"]').value = d.node.data;
        document.getElementById('categoryDropdown').textContent = d.node.text;
        const dropdown = bootstrap.Dropdown.getOrCreateInstance(
          document.getElementById('categoryDropdown')
        );
        dropdown.hide();
      }
    });
  });

// handle form submit
 document.getElementById('parserForm').addEventListener('submit', async (e) => {
   e.preventDefault();
   const form = e.target;
  const params = new URLSearchParams({
    query: form.keywords.value,
    limit: 40,
    offset: 0,
    sort_by: form.sort_by ? form.sort_by.value : 'created_at:desc',
    'filter_float_price:from': form.price_min.value || 0,
    'filter_float_price:to': form.price_max.value || 999999,
    lang: form.lang.value
  });
   if (form.category.value) params.append('category_id', form.category.value);
  try {
    const resp = await fetch(PROXY_URL + '?' + params.toString(), {
      headers: { 'Accept-Language': form.lang.value || 'uk' }
    });
    const data = await resp.json();
    const tbody = $('#results tbody').empty();
    const offers = (data.data || []).filter(offer => offer.stats?.views > 2000);
    offers.forEach(offer => {
      const title = offer.title || '—';
      const price = (offer.price && offer.price.value) || '—';
      const city = (offer.location && offer.location.city) || '—';
      const url = offer.url || '#';

      const tr = $('<tr>');
      $('<td>').text(title).appendTo(tr);
      $('<td>').text(price).appendTo(tr);
      $('<td>').text(city).appendTo(tr);
      $('<td>').append(
        $('<a>').attr('href', url).attr('target', '_blank').text('Ссылка')
      ).appendTo(tr);
      tbody.append(tr);
    });
     if ($.fn.dataTable.isDataTable('#results')) {
       $('#results').DataTable().destroy();
     }
     $('#results').DataTable({
       language: { url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Russian.json' }
     });
   } catch (err) {
     alert('Ошибка загрузки: ' + err);
   }
 });
