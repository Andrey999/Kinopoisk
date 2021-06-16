import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterSelect: {
            width: '100%',
            marginBottom: '15px'
        }
    })
)