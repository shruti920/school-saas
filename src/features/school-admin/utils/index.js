export const schoolAdminUtils = {
  /**
   * Format currency to INR
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Format date to Indian locale
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date string
   */
  formatDate: (date) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);
  },

  /**
   - Format date and time
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date time string
   */
  formatDateTime: (date) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  },

  /**
   * Generate a unique ID (simple implementation)
   * @returns {string} Random ID
   */
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @param {string} suffix - Suffix to add when truncated
   * @returns {string} Truncated text
   */
  truncateText: (text, maxLength = 100, suffix = "...") => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + suffix;
  },

  /**
   * Calculate percentage
   * @param {number} value - Current value
   * @param {number} total - Total value
   * @returns {number} Percentage value
   */
  calculatePercentage: (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  },

  /**
   * Get status color based on status type
   * @param {string} status - Status value
   * @returns {string} CSS class for status
   */
  getStatusClass: (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'approved':
      case 'paid':
        return 'text-success';
      case 'pending':
      case 'processing':
      case 'draft':
        return 'text-warning';
      case 'inactive':
      case 'cancelled':
      case 'rejected':
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  },

  /**
   * Get status badge variant
   * @param {string} status - Status value
   * @returns {string} Badge variant
   */
  getBadgeVariant: (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'approved':
      case 'paid':
        return 'success';
      case 'pending':
      case 'processing':
      case 'draft':
        return 'warning';
      case 'inactive':
      case 'cancelled':
      case 'rejected':
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  },

  /**
   * Sort array of objects by property
   * @param {Array} array - Array to sort
   * @param {string} property - Property to sort by
   * @param {string} order - Sort order (asc/desc)
   * @returns {Array} Sorted array
   */
  sortByProperty: (array, property, order = 'asc') => {
    return [...array].sort((a, b) => {
      if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
      if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },

  /**
   * Filter array by search term
   * @param {Array} array - Array to filter
   * @param {string} searchTerm - Search term
   * @param {Array<string>} fields - Fields to search in
   * @returns {Array} Filtered array
   */
  filterBySearch: (array, searchTerm, fields = []) => {
    if (!searchTerm || !Array.isArray(array)) return array;

    const term = searchTerm.toLowerCase().trim();
    if (!term) return array;

    return array.filter(item => {
      if (fields.length === 0) {
        // Search all string properties
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(term)
        );
      } else {
        // Search specific fields
        return fields.some(field =>
          String(item[field]).toLowerCase().includes(term)
        );
      }
    });
  },

  /**
   * Group array by property
   * @param {Array} array - Array to group
   * @param {string} property - Property to group by
   * @returns {Object} Grouped object
   */
  groupBy: (array, property) => {
    return array.reduce((acc, item) => {
      const key = item[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  },

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in ms
   * @returns {function} Debounced function
   */
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  /**
   * Throttle function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit in ms
   * @returns {function} Throttled function
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
};

// Export individual utilities for convenience
export const {
  formatCurrency,
  formatDate,
  formatDateTime,
  generateId,
  truncateText,
  calculatePercentage,
  getStatusClass,
  getBadgeVariant,
  sortByProperty,
  filterBySearch,
  groupBy,
  debounce,
  throttle
} = schoolAdminUtils;

export default schoolAdminUtils;