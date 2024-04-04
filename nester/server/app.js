const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//middleware
app.use(cors());
app.use(express.json())

//ROUTES//

// get all

app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM networks";

    const allNetworks = await pool.query(query);
    res.json(allNetworks.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/networks/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const query = "SELECT * FROM networks WHERE id =$1";
    const values = [id];

    const network = await pool.query(query, values)
    res.json(network.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/networks/:id/machines", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM machines WHERE network_id = $1";
    const values = [id];

    const machines = await pool.query(query, values);

    if (machines.rows.length > 0) {
      res.json(machines.rows);
    } else {
      res.status(404).send("No machines found for this network ID");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.get("/networks/:id/machines/:machineId", async (req, res) => {
  try {
    const { id, machineId } = req.params;
    const query = "SELECT * FROM machines WHERE network_id = $1 AND machine_id = $2";
    const values = [id, machineId];

    const machine = await pool.query(query, values);

    if (machine.rows.length > 0) {
      res.json(machine.rows[0]);
    } else {
      res.status(404).send("Machine not found in this network");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.get("/machines/:machineId/open_ports", async (req, res) => {
  try {
    const { machineId } = req.params;
    const query = "SELECT * FROM open_ports WHERE machine_id = $1";
    const values = [machineId];

    const openPorts = await pool.query(query, values);

    if (openPorts.rows.length > 0) {
      res.json(openPorts.rows);
    } else {
      res.status(404).send("No open ports found for this machine");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.listen(3001, () => {
  console.log("Serveur démarré sur le port 3001");
});
