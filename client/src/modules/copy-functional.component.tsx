import * as React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { RootState } from "../redux/store";

interface OwnProps {

}

interface PropsFromState {

}

interface PropsFromDispatch {

}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;

const CopyFunctionalComponent: React.FC<AllProps> = (props: AllProps) => {
    return null;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = (state: RootState) => ({});

const CopyFunctional = connect<OwnProps>(
    CopyFunctionalComponent,
    connect(mapStateToProps, mapDispatchToProps)
);

export default CopyFunctional;
