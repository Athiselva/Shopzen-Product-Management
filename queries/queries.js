const productQueries = {
    SELECT_ALL_PRODUCTS: 'SELECT * FROM product WHERE is_deleted = 0',
    SELECT_PRODUCT_BY_ID: 'SELECT * FROM product WHERE id = ? AND is_deleted = 0',
    INSERT_PRODUCT: 'INSERT INTO product SET ?',
    UPDATE_PRODUCT_BY_ID: 'UPDATE product SET ? WHERE id = ? AND is_deleted = 0',
    DELETE_PRODUCT_BY_ID: 'UPDATE product SET is_deleted = 1 WHERE id = ? AND is_deleted = 0',
};

module.exports = {
    productQueries,
};