﻿<%@ Page Title="Home Page" Language="C#" Theme="MyTheme" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BS.WebForms._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm deletion</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this record?</p>
          </div>
          <div class="modal-footer">

            <asp:Button ID="ConfirmDelete" runat="server" Text="Delete" class="btn btn-primary" OnClick="ConfirmDelete_Click"/>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <asp:HyperLink NavigateUrl="~/AddReview" Text="Add New Review" runat="server" />

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:HiddenField ID="ItemIDToDelete" runat="server" />
            <asp:GridView ID="reviewGrid" runat="server"
         AutoGenerateEditButton="True" AutoGenerateDeleteButton="True"  
        DataSourceID="BSDataSource" AllowPaging="True" AllowSorting="True" DataKeyNames="Id" OnRowDataBound="reviewGrid_RowDataBound1">
        
    </asp:GridView>


<asp:SqlDataSource ID="BSDataSource" runat="server" ConnectionString="<%$ ConnectionStrings:BS.DBConnectionString %>" SelectCommand="SELECT * FROM Review" DeleteCommand="DELETE FROM Review WHERE @Id = Id" OnDeleting="BSDataSource_Deleting" ProviderName="<%$ ConnectionStrings:BS.DBConnectionString.ProviderName %>" UpdateCommand="UPDATE Review
		SET [Name] = @Name, [DateOfBirth] = @DateOfBirth, [Message] = @Message
		WHERE @Id = Id">
    <DeleteParameters>
        <asp:Parameter Name="Id" Type="Int32" />
    </DeleteParameters>
    <UpdateParameters>
        <asp:Parameter Name="Id" />
        <asp:Parameter Name="Name" />
        <asp:Parameter Name="DateOfBirth" />
        <asp:Parameter Name="Message" />
    </UpdateParameters>
    </asp:SqlDataSource>
        </ContentTemplate>
    
        </asp:UpdatePanel>


</asp:Content>
