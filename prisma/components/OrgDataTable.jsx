import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import { useEffect, useState } from "react"

// DATA AND TABLE CREATORS

function createData(id, description, option, consentDate, policy, subject, revoke, validity, history) {
    return {
        id,
        description,
        option,
        consentDate,
        policy,
        subject,
        revoke,
        validity,
        history
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
        numeric: false,
        disablePadding: false,
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

function MyRow({row}) {
    const [open, setOpen] = useState(false);

    return (
        <>
           <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TableCell sx={{color:'secondary.contrastText'}} align="right">{row.id}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.subject}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.description}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.option}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.consentDate}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.validity}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="right">{row.policy}</TableCell>
                <TableCell sx={{color:'secondary.contrastText'}} align="left">{row.revoke}</TableCell>
           </TableRow> 
           <TableRow sx={{backgroundColor:'secondary.main'}}>
               <TableCell style={{paddingBottom: 0, paddinTop: 0}} colSpan={8}>
                   <Collapse in={open} timeout="auto" unmountOnExit>
                       <Box sx={{magin:1}}>
                           <Typography variant="h6" gutterBottom component="div" sx={{color:"warning.dark"}}>
                               History
                           </Typography>
                           <Table size="small" aria-label="consent history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color:'warning.light'}}>ID</TableCell>
                                        <TableCell sx={{color:'warning.light'}}>Changed to</TableCell>
                                        <TableCell sx={{color:'warning.light'}}>Timestamp</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((element) => (
                                        <TableRow key={element.id}>
                                            <TableCell sx={{color:'warning.light'}}>{element.id}</TableCell>
                                            <TableCell sx={{color:'warning.light'}}>{element.changedValue}</TableCell>
                                            <TableCell sx={{color:'warning.light'}}>{element.timestamp === "-"  ? "-" : new Date(element.timestamp).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                           </Table>
                       </Box>
                   </Collapse>
               </TableCell>
           </TableRow>
        </>
    )
}

function parseHistory(input) {
    let output = input.map(element => {
        return {
            id: element.id,
            changedValue: (element.changedValue ? "true" : "false"),
            timestamp: element.timestamp,
        }
    })
    output.sort((a, b) => b.id - a.id)
    return output
}


export default function OrgDataTable({data}) {
    
    const [list, setList] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    
    useEffect(() => {
        let rows = []
        if(data.consents!==undefined) {
            rows = data.consents.map(item => {
                let revoke = item.revokeDate === null ? "---" : new Date(item.revokeDate).toLocaleString();
                let option = item.subjectOption ? "Agree" : "Disagree"
                let history = (data.history !== undefined && item.id in data.history ? parseHistory(data.history[item.id]) : [{id: "-", consentID:"-",changedValue:"-",timestamp:"-"}])
            
                let consentDate = new Date(item.consentDate).toLocaleString()
                let validUntil = new Date(item.validUntil).toLocaleString();
                return createData(
                    item.id,
                    item.description,
                    option,
                    consentDate,
                    item.policyID,
                    data.users[item.subjectId],
                    revoke,
                    validUntil,
                    history
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
                <TableContainer >
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
                                    <MyRow key={row.id} row={row} />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        )
}

