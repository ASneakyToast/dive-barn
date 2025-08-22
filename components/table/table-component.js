/**
 * Dive Barn Table Component
 * A reusable table web component for displaying tabular data
 */
class DBTable extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['headers', 'data', 'highlight-total'];
    }

    attributeChangedCallback() {
        this.render();
    }

    parseData() {
        const dataAttr = this.getAttribute('data');
        if (dataAttr) {
            try {
                return JSON.parse(dataAttr);
            } catch (e) {
                console.error('Invalid JSON in data attribute:', e);
                return [];
            }
        }
        return [];
    }

    parseHeaders() {
        const headersAttr = this.getAttribute('headers');
        if (headersAttr) {
            try {
                return JSON.parse(headersAttr);
            } catch (e) {
                console.error('Invalid JSON in headers attribute:', e);
                return [];
            }
        }
        return [];
    }

    render() {
        const headers = this.parseHeaders();
        const data = this.parseData();
        const highlightTotal = this.hasAttribute('highlight-total');

        if (headers.length === 0 || data.length === 0) {
            this.innerHTML = '<p>No data to display</p>';
            return;
        }

        let tableHTML = `
            <div class="db-table-container">
                <table class="db-table">
                    <thead>
                        <tr>
        `;

        // Add headers
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });

        tableHTML += `
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Add data rows
        data.forEach((row, index) => {
            const isLastRow = index === data.length - 1;
            const rowClass = (highlightTotal && isLastRow) ? ' class="total-row"' : '';
            
            tableHTML += `<tr${rowClass}>`;
            
            row.forEach((cell, cellIndex) => {
                if (highlightTotal && isLastRow) {
                    tableHTML += `<td><strong>${cell}</strong></td>`;
                } else {
                    tableHTML += `<td>${cell}</td>`;
                }
            });
            
            tableHTML += '</tr>';
        });

        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

        this.innerHTML = tableHTML;
    }
}

// Register the custom element
customElements.define('db-table', DBTable);