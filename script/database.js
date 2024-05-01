import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()


export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users')
  return rows
}

export async function getUser(id) {
  const [rows] = await pool.query(`
  SELECT *
  FROM users
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function createUser(userTag, username) {
  const [result] = await pool.query(`
  INSERT INTO users (user_tag, username)
  VALUES (?,  ?)
  `, [userTag, username])
  const id = result.insertId
  return getUser(id)
}

export async function getTimes() {
  const [rows] = await pool.query('SELECT * FROM times')
  return rows
}

export async function getTimesFromUserId(user_id) {
  const [rows] = await pool.query(`
  SELECT *
  FROM times
  WHERE user_id = ?
  `, [user_id])
  return rows
}

export async function getTimeFromId(id) {
  const [rows] = await pool.query(`
  SELECT *
  FROM times
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function createTime(user_id, scramble, scramble_size, time) { // TODO: make scramble size auto
  const [result] = await pool.query(`
  INSERT INTO times (user_id, scramble, scramble_size, time)
  VALUES (?, ?, ?, ?)
  `, [user_id, scramble, scramble_size, time])
  const id = result.insertId
  return getTimeFromId(id)
}