$(document).ready(function() {
	$('.cargoDynamicTable').each(function(index) {

		const $table = $(this);

        let params = {
            scrollX: true,
            language: { search: "" },
            columns: []
        };

		let pageLength = $table.attr('data-page-length');
		const num = Number(pageLength);
		if (Number.isInteger(num) && num > 0) {
			params.pageLength = num;
			let lengthOptions = [10, 25, 50, 100];
			if (!lengthOptions.includes(num)) {
                lengthOptions.push(num); 
				lengthOptions.sort((a, b) => a - b);
				params.lengthMenu = lengthOptions;
			}
		}

		const ths = $table.find('thead th');
		const columnWidths = $table.attr('data-widths');
		let widthList = [];
		if(columnWidths) {
			widthList = columnWidths.split(',').map(w => w.trim());
		}
		ths.each(function (i) {
		    const colDef = {};
		    if (widthList[i]) {
		        colDef.width = widthList[i];
		    } else {
		        colDef.width = 'auto';
		    }
		    params.columns.push(colDef);
		});

		let dt = new DataTable(this, params);

		$(dt.table().container())
			.find('input[type="search"]')
			.attr('placeholder', 'Search');

		// hidden fields toggle
		$('a.toggle-vis').each(function() {
			let column = dt.column($(this).data('column'));
			column.visible(false);
			$(this).on('click', function(e) {
				e.preventDefault();
				column.visible(!column.visible());
			});
		});

		// Add popup tooltip for all column headers
		let headerTooltips = $table.attr('data-tooltips');
		if (headerTooltips !== undefined) {
			headerTooltips = headerTooltips.split(',');
			$('th[aria-controls=DataTables_Table_' + index + ']').each(function(idx) {
				if (headerTooltips[idx] && headerTooltips[idx].trim() !== '') {
					let popupButton = new OO.ui.PopupButtonWidget({
						icon: 'info',
						framed: false,
						popup: {
							$content: $('<p>' + headerTooltips[idx].trim() + '</p>')
						}
					});
					$(this).append('&nbsp;');
					$(this).append(popupButton.$element);
				}
			});
			$('.oo-ui-popupWidget-body p').attr('style', 'font-weight: normal;');
		}
	});
});