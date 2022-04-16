import { Box, Container, TableCell, TableHead, TableRow, TableSortLabel, Paper, TableBody, Table, TableContainer } from "@mui/material"
import { useEffect, useState } from "react"
import { visuallyHidden } from "@mui/utils"
import superjson from "superjson"

// DATA AND TABLE CREATORS

function createData(id, description, option, consentDate, policy, subject, revoke, validity) {
    return {
        id,
        description,
        option,
        consentDate,
        policy,
        subject,
        revoke,
        validity
    }
}

const consentHeaders = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Serial ID',
    },
    {
        id: 'subject',
        numeric: true,
        disablePadding: true,
        label: 'Subject ID',
    },  
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'option',
        numeric: false,
        disablePadding: false,
        label: 'Option',
    },
    {
        id: 'consentDate',
        numeric: false,
        disablePadding: false,
        label: 'Date of Consent',
    },
    {
        id: 'validity',
        numeric: false,
        disablePadding: false,
        label: 'Valid Until',
    },
    {
        id: 'policy',
        numeric: true,
        disablePadding: false,
        label: 'Policy ID',
    },
    {
        id: 'revoke',
        numeric: false,
        disablePadding: false,
        label: 'Revoked',
    },
]

//  SORTING FUNCTIONS

function descendingComparator(a, b, orderBy) {
    if(b[orderBy] < a[orderBy]) {
        return -1;
    }
    if(b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' 
        ?   (a, b) =>  descendingComparator(a, b, orderBy)
        :   (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedArray = array.map((e, i) => [e, i])
    stabilizedArray.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if(order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedArray.map(e => e[0])
}

// TABLE COMPONENTS

function MyTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => onRequestSort(event, property);

    return (
        <TableHead sx={{width:'100%'}}>
            <TableRow key="header">
                {consentHeaders.map((cell) => (
                    <TableCell sx={{backgroundColor:'secondary.light', color:'secondary.contrastText'}}
                        key={cell.id}
                        align={cell.numeric ? 'right' : 'left'}
                        padding={cell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === cell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === cell.id}
                            direction={orderBy === cell.id ? order : 'asc'}
                            onClick={createSortHandler(cell.id)}
                        >
                            {cell.label}
                            {orderBy === cell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}


export default function DataTable({data}) {
    
    const [list, setList] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('serial');
    
    useEffect(() => {
        let rows = []
        if(data.consents!==undefined) {
            rows = data.consents.map(item => {
                let revoke = item.revokeDate === null ? "---" : new Date(item.revokeDate).toLocaleString();
                let option = item.subjectOption ? "Agree" : "Disagree"
                let consentDate = new Date(item.consentDate).toLocaleString()
                let validUntil = new Date(item.validUntil).toLocaleString();
                return createData(
                    item.id,
                    item.description,
                    option,
                    consentDate,
                    item.policyID,
                    item.subjectId,
                    revoke,
                    validUntil
                )
            })
        }
        setList(rows)
    }, [data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property)
    }


    return (
            <Paper sx={{width:'100%', height:'100%'}}>
            <TableContainer sx={{height:'100%', width:'100%', backgroundColor:'secondary.main'}}>

                <Table stickyHeader sx={{backgroundColor:'secondary.light'}}>
                    <MyTableHead 
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={list.length}
                    />
                    <TableBody>
                        {stableSort(list, getComparator(order, orderBy))
                            .map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="right">{row.id}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="right">{row.subject}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.description}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.option}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.consentDate}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.validity}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="right">{row.policy}</TableCell>
                                    <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.revoke}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        )
}

