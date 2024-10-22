require('dotenv').config(); // Load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use secret key from .env file
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use('/assets', express.static(path.join(__dirname, 'src/assets'))); // Static directory for uploaded images
app.use('/src/assets/images', express.static(path.join(__dirname, 'src/assets/images')));


// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './src/assets/images/', // Store uploaded files
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000000000000000000 }, // Adjust file size as needed
}).single('image');


//---------------------------------------------Logo--------------------------------------------------------------//
// Get Logo
app.get('/logo', (req, res) => {
  const query = "SELECT * FROM logo";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.status(200).json(results);
  });
});


// Create a new product
app.post('/create-logo', (req, res) => {

  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
   
    const imagePath = req.file.filename;

    const query = "INSERT INTO logo (`logo`) VALUES (?)";
    db.query(query, [imagePath], (err, results) => {

      if (err) return res.status(500).json({ error: 'Failed to create Logo' });
      res.status(200).json({ message: "Logo created successfully", productId: results.insertId });

    });
  });
});



app.put('/logo/:id', (req, res) => {
  const logoId = req.params.id;

  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err); // Log file upload error
      return res.status(500).send({ message: 'Error uploading file' });
    }

    const imagePath = req.file ? req.file.filename : null;

    const getLogoQuery = 'SELECT `logoImage` FROM logo WHERE id = ?';
    db.query(getLogoQuery, [logoId], (err, result) => {
      if (err) {
        console.error('Error fetching logo from database:', err); // Log database fetch error
        return res.status(500).json({ error: 'Failed to fetch logo' });
      }

      const oldImage = result[0]?.logoImage; // Adjust field name to match your DB

      const updateLogoQuery = 'UPDATE logo SET logoImage = ? WHERE id = ?';
      db.query(updateLogoQuery, [imagePath || oldImage, logoId], (err, result) => {
        if (err) {
          console.error('Error updating logo in database:', err); // Log database update error
          return res.status(500).json({ error: 'Failed to update logo' });
        }

        if (imagePath && oldImage) {
          const oldImagePath = path.join(__dirname, './src/assets/images/', oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err);
            else console.log('Old image deleted:', oldImage);
          });
        }

        res.status(200).json({ message: 'Logo updated successfully' });
      });
    });
  });
});



app.delete('/logo/:id', (req, res) => {
  const logoId = req.params.id;
  const query = "DELETE FROM logo WHERE id = ?";
  db.query(query, [logoId], (err, results) => {
    if (err) {
      console.error("Error deleting logo:", err);
      return res.status(500).json({ error: 'Failed to delete logo' });
    }
    res.status(200).json({ message: 'Logo deleted successfully' });
  });
});



//---------------------------------------------Product Section--------------------------------------------------------------//
// Get all products
app.get('/products', (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.status(200).json(results);
  });
});
// Get a single product by ID
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(results[0]);
  });
});


// Create a new product
app.post('/create-product', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    console.log(req.body)
    const { product_name, product_price, offer_price,product_description, size, category_id } = req.body;
    const imagePath = req.file.filename;

    const query = "INSERT INTO products (`product_name`, `product_image`, `product_price`, `offer_price`, `product_description`,`size`, `category_id`) VALUES ( ?, ?, ?, ?, ?, ?,?)";
    db.query(query, [product_name, imagePath, product_price, offer_price,product_description,size,category_id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to create product' });
      res.status(200).json({ message: "Product created successfully", productId: results.insertId });
    });
  });
});

// Update product
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;

  upload(req, res, (err) => {
    if (err) return res.status(500).send({ message: 'Error uploading file' });

    const { product_name, product_price, offer_price, product_description, size, category_id } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const getProductQuery = 'SELECT product_image FROM products WHERE id = ?';
    db.query(getProductQuery, [productId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch product' });

      const oldImage = result[0]?.product_image;

      const updateProductQuery = 'UPDATE products SET product_name = ?, product_price = ?, offer_price=?, product_description = ?, size = ?, category_id = ?, product_image = ? WHERE id = ?';
      db.query(updateProductQuery, [product_name, product_price, offer_price,  product_description, size, category_id, imagePath || oldImage, productId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update product' });

        if (imagePath && oldImage) {
          const oldImagePath = path.join(__dirname, './src/assets/images/', oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err);
            else console.log('Old image deleted:', oldImage);
          });
        }

        res.status(200).json({ message: 'Product updated successfully' });
      });
    });
  });
});


// Delete a product
app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to delete product' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});
//---------------------------------------------Product Size--------------------------------------------------------------//


// Get all categories
app.get('/product-sizes', (req, res) => {
  const query = "SELECT * FROM product_size";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Product Size:", err);
      return res.status(500).json({ error: 'Failed to fetch Product Size' });
    }
    res.status(200).json(results);
  });
});


//---------------------------------------------Categories Section--------------------------------------------------------------//



// Get all categories
app.get('/categories', (req, res) => {
  const query = "SELECT * FROM categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.status(200).json(results);
  });
});


app.post('/create-category', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { category_name, category_shippingCost } = req.body;
    const imagePath = req.file.filename; // Get the uploaded file's name

    const query = "INSERT INTO `categories`(`category_name`, `category_shippingCost`, `category_image`) VALUES (?, ?, ?)";
    db.query(query, [category_name, category_shippingCost, imagePath], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create category' });
      }
      res.status(200).json({ message: 'Category created successfully', categoryId: results.insertId });
    });
  });
});

app.delete('/categories/:id', (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM `categories` WHERE `id` = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to delete category' });
      }
      res.status(200).json({ message: "Category deleted successfully" });
  });
});


// Get products by category
app.get('/products/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  const query = "SELECT * FROM products WHERE category_id = ?";

  db.query(query, [category_id], (err, results) => {
    if (err) {
      console.error("Error fetching products by category:", err);
      return res.status(500).json({ error: 'Failed to fetch products by category' });
    }
    res.status(200).json(results);
  });
});

//-------------------------------------------------Orders Section----------------------------------------------------------//


app.get('/orders', (req, res) => {
  const query = `
    SELECT
      customers.name,
      customers.phone_number,
      customers.address,
      orders.orderNumber,
      orders.total_amount,
      orders.shipping_cost,
      orders.payment_method,
      orders.payment_status,
      order_items.product_name,
      order_items.quantity,
      order_items.size,
      order_items.product_id,
      orders.id
    FROM orders

    JOIN customers ON orders.customer_id = customers.id
    JOIN order_items ON order_items.order_id = orders.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.status(200).json(results);
  });
  
});




app.post('/create-order', (req, res) => {
  const {
    customer,   // First destructure the customer object
    orderNumber,
    total,
    payment_method,
    transaction_mobile,
    items,
    shippingCost
  } = req.body;

  const { name, address, phone_number, email } = customer;

  // Insert customer details into the customers table
  const customerQuery = `
    INSERT INTO customers (name, address, phone_number, email) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(customerQuery, [name, address, phone_number, email], (err, results) => {
    if (err) {
      console.error('Error inserting customer:', err);
      return res.status(500).json({ error: 'Failed to insert customer' });
    }

    const customerId = results.insertId;

    // Insert order into the orders table using the customer ID
    const ordersQuery = `
      INSERT INTO orders (orderNumber, customer_id, total_amount,shipping_cost, payment_method, tnx_mobile_number) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(ordersQuery, [orderNumber, customerId, total,shippingCost, payment_method, transaction_mobile], (err, results) => {
      if (err) {
        console.error('Error inserting order:', err);
        return res.status(500).json({ error: 'Failed to insert order' });
      }

      const orderId = results.insertId;

      // Insert each product into the order_items table
      const itemsQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, product_price, size, quantity) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      items.forEach((item) => {
        db.query(itemsQuery, [orderId, item.id, item.product_name, item.product_price, item.size, item.quantity], (err, results) => {
          if (err) {
            console.error('Error inserting order item:', err);
            return res.status(500).json({ error: 'Failed to insert order item' });
          }
        });
      });

      // Send success response after all queries are successful
      return res.status(200).json({ message: 'Order created successfully!' });
    });
  });
});




app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone_number, address, total_amount, payment_method, payment_status, items } = req.body;

  // Update order query
  const updateOrderQuery = `
    UPDATE orders
    SET total_amount = ?, payment_method = ?, payment_status = ?
    WHERE id = ?;
  `;
  
  db.query(updateOrderQuery, [total_amount, payment_method, payment_status, id], (err) => {
    if (err) {
      console.error("Error updating order:", err);
      return res.status(500).json({ error: 'Failed to update order' });
    }

    // Update customer query
    const updateCustomerQuery = `
      UPDATE customers
      SET name = ?, address = ?, phone_number = ?
      WHERE id = (SELECT customer_id FROM orders WHERE id = ?);
    `;

    db.query(updateCustomerQuery, [name, address, phone_number, id], (err) => {
      if (err) {
        console.error("Error updating customer:", err);
        return res.status(500).json({ error: 'Failed to update customer information' });
      }

      // Update each item in the order
      const updateItemsQuery = `
        UPDATE order_items
        SET product_name = ?, quantity = ?
        WHERE order_id = ? AND product_id= ? ;
      `;

      let updateItemCount = 0;

      items.forEach((item) => {
        db.query(updateItemsQuery, [item.product_name, item.quantity, item.order_id, item.product_id], (err) => {
          if (err) {
            console.error("Error updating order item:", err);
            return res.status(500).json({ error: 'Failed to update order items' });
          }

          // Check if all items are updated
          updateItemCount++;
          if (updateItemCount === items.length) {
            res.status(200).json({ message: 'Order and items updated successfully' });
          }
        });
      });
    });
  });
});




app.delete('/order/:id', (req, res) => {
  const { id } = req.params;

  // Delete from orders
  const orderQuery = "DELETE FROM orders WHERE id = ?";
  db.query(orderQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to delete order' });

    // After deleting from orders, delete related order_items
    const itemsQuery = "DELETE FROM order_items WHERE order_id = ?";
    db.query(itemsQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to delete order items' });
      res.status(200).json({ message: 'Order and related items deleted successfully' });
    });
  });
});


// Delete an item from the order_items table
app.delete('/order-item/:order_id/:product_id', (req, res) => {
  const { order_id, product_id } = req.params;

  const deleteItemQuery = "DELETE FROM order_items WHERE order_id = ? AND product_id = ?";
  db.query(deleteItemQuery, [order_id, product_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete order item' });
    }

    res.status(200).json({ message: 'Order item deleted successfully' });
  });
});



// Add a new item to order_items table
app.post('/order-item', (req, res) => {
  const { order_id, product_id, product_name, quantity, product_price } = req.body;

  const addItemQuery = `
    INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(addItemQuery, [order_id, product_id, product_name, quantity, product_price], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to add order item' });

    res.status(200).json({ message: 'Order item added successfully', itemId: results.insertId });
  });
});

//-------------------------------------------------Slider Section----------------------------------------------------------//


// Get all Slider
app.get('/slider', (req, res) => {
  const query = "SELECT * FROM slider";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.status(200).json(results);
  });
});

// Create a new product
app.post('/create-slider', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Destructure the request body to match the frontend
    const { slider_hook, slider_story, slider_buttonText } = req.body;
    const imagePath = req.file.filename;

    // Update query to use the correct column names
    const query = "INSERT INTO slider (`slider_image`, `slider_Hook`, `slider_story`, `slider_buttonText`) VALUES (?, ?, ?, ?)";
    db.query(query, [imagePath, slider_hook, slider_story, slider_buttonText], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to create Slider' });
      res.status(200).json({ message: "Slider created successfully", productId: results.insertId });
    });
  });
});

app.delete('/slider/:id', (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM `slider` WHERE `id` = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to delete category' });
      }
      res.status(200).json({ message: "Category deleted successfully" });
  });
});

//-------------------------------------------------User Section----------------------------------------------------------//

// JWT secret key
const secretKey = 'dD@DanialIslam';

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = "SELECT `id`, `email`, `password`, `role` FROM `users` WHERE `email` = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        return res.json({ token, role: user.role });
    });
});







//-------------------------------------------------Stripe Section----------------------------------------------------------//


// Stripe Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;  // Ensure the amount is coming correctly from the frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe accepts amounts in cents
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
