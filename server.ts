import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Fake database
let products = [
  {
    id: "1",
    name: "Golden AirPods Pro 2",
    price: 249.99,
    discountPrice: 199.99,
    category: "Earbuds",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80"],
    featured: true,
    trending: true,
    newArrival: false,
    description: "Premium noise-canceling wireless earbuds with a sleek golden touch."
  },
  {
    id: "2",
    name: "Luxury Carbon Fiber Smartwatch",
    price: 399.00,
    discountPrice: null,
    category: "Smart Watches",
    stock: 5,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"],
    featured: true,
    trending: false,
    newArrival: true,
    description: "Elegant smartwatch with fitness tracking and carbon fiber finish."
  },
  {
    id: "3",
    name: "Eclipse Wireless Headphones",
    price: 150.00,
    discountPrice: 120.00,
    category: "Headphones",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
    featured: false,
    trending: true,
    newArrival: false,
    description: "High-fidelity audio with deep bass and premium comfort."
  },
  {
    id: "4",
    name: "Titanium Power Bank 20000mAh",
    price: 89.99,
    discountPrice: 59.99,
    category: "Power Banks",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80"],
    featured: false,
    trending: false,
    newArrival: true,
    description: "Fast charging portable charger with titanium finish."
  }
];

// Product API Routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
