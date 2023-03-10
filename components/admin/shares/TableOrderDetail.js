import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios"

export default function TableOrderDetail(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        function fetchData() {
            axios.get(`http://localhost:8000/admin/order/detail/${props.id}`).then(res => {
                setProducts(res.data)
            })
        }
        fetchData();
    }, [products])

    if (products.length !== 0) {
        let rows = []
        const TAX_RATE = 0.07;

        function ccyFormat(num) {
            return `${num.toFixed(2)}`;
        }

        function priceRow(qty, unit) {
            return qty * unit;
        }

        function createRow(desc, qty, unit) {
            const price = priceRow(qty, unit);
            return { desc, qty, unit, price };
        }

        products.map(product => {
            let proDct = createRow(product.name, product.quantity, product.price)
            rows.push(proDct)
        })

        function subtotal(items) {
            return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        }
        const invoiceSubtotal = subtotal(rows);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <p>Loading...</p>
    }
}