<%@ Page Title="" Language="C#" Theme="MyTheme" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddReview.aspx.cs" Inherits="BS.WebForms.AddReview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <asp:FormView runat="server" ID="addReviewForm"
    ItemType="BS.WebForms.WFViewModels.ReviewVMWF" 
    InsertMethod="addReviewForm_InsertItem" DefaultMode="Insert"
    RenderOuterTable="false" OnItemInserted="addReviewForm_ItemInserted">
    <InsertItemTemplate>
        <fieldset>
            <ol>
                <asp:DynamicEntity runat="server" Mode="Insert" />
            </ol>
            <asp:validationsummary id="valSummary" runat="server" headertext="Validation Errors:" cssclass="ValidationSummary" />
            <asp:Button runat="server" Text="Insert" CommandName="Insert" />
            <asp:Button runat="server" Text="Cancel" CausesValidation="false" OnClick="cancelButton_Click" />
        </fieldset>
    </InsertItemTemplate>
</asp:FormView>
<%--<script>
    $( document ).ready(function() {
        $('#MainContent_addReviewForm_ctl04_ctl02___DateOfBirth_TextBox1').datepicker({
            format: 'mm-dd-yyyy'
        });
    });
</script>--%>
</asp:Content>
