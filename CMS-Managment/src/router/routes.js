import { Router } from "express";
import { createUser, getUserById, updateUser, deleteUser, loginUser } from "../module/user.module.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductAccess, getProductAccessById, createProductAccess, updateProductStatus } from "../module/product.module.js";
import { createAccess, getAccess, updateAccess, deleteAccess } from "../module/access.module.js";

const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));

// User routes
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Product routes
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Product Access routes
router.post("/product-access", createProductAccess);
router.get("/product-access", getProductAccess);
router.get("/product-access/:id", getProductAccessById);
router.patch("/products/:id/status", updateProductStatus);

// Access routes
router.post("/access", createAccess);
router.get("/access", getAccess);
router.put("/access/:id", updateAccess);
router.delete("/access/:id", deleteAccess);

export default router;
